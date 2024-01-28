export const filterObject = (obj: any) => {
    Object.keys(obj).forEach(
        (key) => obj[key] === undefined && delete obj[key]
    );
};

export const object2string = (params: any) =>
    Object.keys(params)
        .map(
            (key) =>
                key +
                "=" +
                (String(params[key]).startsWith("\\")
                    ? String(params[key]).substring(1)
                    : `'${params[key]}'`)
        )
        .join(",");

export function flattenObject(obj: any) {
    let toReturn: any = {};
    for (let i in obj) {
        if (!obj.hasOwnProperty(i)) continue;

        if (typeof obj[i] == "object" && obj[i] !== null) {
            let flatObject = flattenObject(obj[i]);
            for (let x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;

                toReturn[i + "." + x] = flatObject[x];
            }
        } else {
            toReturn[i] = obj[i];
        }
    }
    return toReturn;
}
