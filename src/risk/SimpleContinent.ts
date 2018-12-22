import { ICountry } from "./Risk";

export const simpleContinent: ICountry[] = [
    {
        id: 0,
        name: "Germany",
        neighbours: [1, 2],
        occupist: null,
        soldiers: 0
    },
    {
        id: 1,
        name: "France",
        neighbours: [0],
        occupist: null,
        soldiers: 0
    },
    {
        id: 2,
        name: "Poland",
        neighbours: [0],
        occupist: null,
        soldiers: 0
    },
    {
        id: 3,
        name: "Spain",
        neighbours: [1, 4],
        occupist: null,
        soldiers: 0
    },
    {
        id: 4,
        name: "Portugal",
        neighbours: [3],
        occupist: null,
        soldiers: 0
    }
];
