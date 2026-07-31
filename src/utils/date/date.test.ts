import { test, expect, describe } from 'vitest'
import { getCurrentDate, formatDate, unformatDate, isBeforeToday } from './date'

describe("All functions in Date.ts must return the expected values", () => {

    test("getCurrentDate should return a string ten characters long", () => {
        const currentDate = getCurrentDate();
        expect(currentDate).toBeTypeOf("string");
        expect(currentDate).toHaveLength(10)
    });

    test("formatDate should return a string ten characters long", () => {
        const formattedDate = formatDate("2026-07-25");
        expect(formattedDate).toBeTypeOf("string");
        expect(formattedDate).toHaveLength(10);
        expect(formattedDate).toEqual("07-25-2026")
    });

    test("unformatDate should return a string ten characters long", () => {
        const unformattedDate = unformatDate("07-25-2026");
        expect(unformattedDate).toBeTypeOf("string");
        expect(unformattedDate).toHaveLength(10);
        expect(unformattedDate).toEqual("2026-07-25")
    });

    test("isBeforeToday must return false if the first argument (day) is before today, otherwise true", () => {

        expect(isBeforeToday("2020-07-25")).toBeTruthy();
        expect(isBeforeToday("2200-07-25")).toBeFalsy();
    })
});