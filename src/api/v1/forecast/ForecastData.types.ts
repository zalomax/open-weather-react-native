// To parse this data:
//
//   import { Convert, ForecastData } from "./file";
//
//   const forecastData = Convert.toForecastData(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface ForecastData {
    cod: string;
    message: number;
    cnt: number;
    list: List[];
    city: City;
}

export interface City {
    id: number;
    name: string;
    coord: Coord;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}

export interface Coord {
    lat: number;
    lon: number;
}

export interface List {
    dt: number;
    main: Main;
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    sys: Sys;
    dt_txt: Date;
}

export interface Clouds {
    all: number;
}

export interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
}

export interface Sys {
    pod: string;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toForecastData(json: string): ForecastData {
        return cast(JSON.parse(json), r("ForecastData"));
    }

    public static forecastDataToJson(value: ForecastData): string {
        return JSON.stringify(uncast(value, r("ForecastData")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) { }
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems") ? transformArray(typ.arrayItems, val)
                : typ.hasOwnProperty("props") ? transformObject(getProps(typ), typ.additional, val)
                    : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "ForecastData": o([
        { json: "cod", js: "cod", typ: "" },
        { json: "message", js: "message", typ: 0 },
        { json: "cnt", js: "cnt", typ: 0 },
        { json: "list", js: "list", typ: a(r("List")) },
        { json: "city", js: "city", typ: r("City") },
    ], false),
    "City": o([
        { json: "id", js: "id", typ: 0 },
        { json: "name", js: "name", typ: "" },
        { json: "coord", js: "coord", typ: r("Coord") },
        { json: "country", js: "country", typ: "" },
        { json: "population", js: "population", typ: 0 },
        { json: "timezone", js: "timezone", typ: 0 },
        { json: "sunrise", js: "sunrise", typ: 0 },
        { json: "sunset", js: "sunset", typ: 0 },
    ], false),
    "Coord": o([
        { json: "lat", js: "lat", typ: 3.14 },
        { json: "lon", js: "lon", typ: 3.14 },
    ], false),
    "List": o([
        { json: "dt", js: "dt", typ: 0 },
        { json: "main", js: "main", typ: r("Main") },
        { json: "weather", js: "weather", typ: a(r("Weather")) },
        { json: "clouds", js: "clouds", typ: r("Clouds") },
        { json: "wind", js: "wind", typ: r("Wind") },
        { json: "visibility", js: "visibility", typ: 0 },
        { json: "pop", js: "pop", typ: 0 },
        { json: "sys", js: "sys", typ: r("Sys") },
        { json: "dt_txt", js: "dt_txt", typ: Date },
    ], false),
    "Clouds": o([
        { json: "all", js: "all", typ: 0 },
    ], false),
    "Main": o([
        { json: "temp", js: "temp", typ: 3.14 },
        { json: "feels_like", js: "feels_like", typ: 3.14 },
        { json: "temp_min", js: "temp_min", typ: 3.14 },
        { json: "temp_max", js: "temp_max", typ: 3.14 },
        { json: "pressure", js: "pressure", typ: 0 },
        { json: "sea_level", js: "sea_level", typ: 0 },
        { json: "grnd_level", js: "grnd_level", typ: 0 },
        { json: "humidity", js: "humidity", typ: 0 },
        { json: "temp_kf", js: "temp_kf", typ: 3.14 },
    ], false),
    "Sys": o([
        { json: "pod", js: "pod", typ: "" },
    ], false),
    "Weather": o([
        { json: "id", js: "id", typ: 0 },
        { json: "main", js: "main", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "icon", js: "icon", typ: "" },
    ], false),
    "Wind": o([
        { json: "speed", js: "speed", typ: 3.14 },
        { json: "deg", js: "deg", typ: 0 },
        { json: "gust", js: "gust", typ: 3.14 },
    ], false),
};
