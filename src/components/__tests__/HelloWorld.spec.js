import { describe, expect, it, test } from 'vitest'
import { flushPromises } from '@vue/test-utils';

import { fillJSONIfEmpty, isAnyNotNullOrUndefined, isJSON, isNumericString } from '../extern/validator'
import { nominatimReverse, nominatim, getDataOfGivenURL } from '../extern/axios'

const emptyJSON = {};
const expectedJSON = { data: 'JSON is empty' };
const filledJSON = { data: 'Im filled' };

// Validator methods
describe('fillJSONIfEmpty', () => {
  it('Fill JSON because its empty', () => {
    expect(fillJSONIfEmpty(emptyJSON)).toStrictEqual(expectedJSON)
  })

  it('Dont fill JSON because its not empty', () => {
    expect(fillJSONIfEmpty(filledJSON)).toBe(filledJSON)
  })

  it('Critical fail at fillJSONIfEmpty', () => {
    expect(fillJSONIfEmpty(21)).toBe(21)
  })
})

describe('isAnyNotNullOrUndefined', () => {
  it('Any is null', () => {
    expect(isAnyNotNullOrUndefined(null)).toBe(false)
  })

  it('Any is undefined', () => {
    expect(isAnyNotNullOrUndefined(undefined)).toBe(false)
  })

  it('Any is nether null nor undefined', () => {
    expect(isAnyNotNullOrUndefined(filledJSON)).toBe(true)
  })
})

describe('isJSON', () => {
  it('Object is a JSON', () => {
    expect(isJSON(filledJSON)).toBe(true)
  })

  it('Object is number', () => {
    expect(isJSON(21)).toBe(false)
  })

  it('Object is null', () => {
    expect(isJSON(null)).toBe(false)
  })
})

describe('isNumericString', () => {
  it('Parameter is a string with numbers', () => {
    expect(isNumericString("21")).toBe(true)
  })

  it('Parameter is a string without numbers', () => {
    expect(isNumericString("String")).toBe(false)
  })

  it('Parameter is not a string but a number', () => {
    expect(isNumericString(21)).toBe(false)
  })

  it('Parameter is null', () => {
    expect(isNumericString(null)).toBe(false)
  })
})

// Axios methods
describe('nominatimReverse', () => {
  test('Right input', async() => {
    await flushPromises();
    const recievedData = await nominatimReverse('52.536940', '13.649490');
    expect(recievedData.address.road).toBe('Schulstraße');
  })

  test('Wrong data input', async() => {
    await flushPromises();
    const recievedData = await nominatimReverse('Auto', 'bahn');
    expect(recievedData).toStrictEqual({});
  })

  test('One argument is missing', async() => {
    await flushPromises();
    const recievedData = await nominatimReverse('52.536940');
    expect(recievedData).toStrictEqual({});
  })

  test('One argument is null', async() => {
    await flushPromises();
    const recievedData = await nominatimReverse('52.536940', null);
    expect(recievedData).toStrictEqual({});
  })
})

describe('nominatim', () => {
  test('Right input', async() => {
    await flushPromises();
    const recievedData = await nominatim('Käthe-Kollwitz-Straße', '12', 'Luckenwalde');
    expect(recievedData[0].lat).toBe('52.0881049');
  })

  test('Housenumber is not a number', async() => {
    await flushPromises();
    const recievedData = await nominatim('Käthe-Kollwitz-Straße', 'Wrong', 'Luckenwalde');
    expect(recievedData).toStrictEqual(emptyJSON);
  })

  test('One argument is missing', async() => {
    await flushPromises();
    const recievedData = await nominatim('Käthe-Kollwitz-Straße', '12');
    expect(recievedData).toStrictEqual(emptyJSON);
  })

  test('One argument is null', async() => {
    await flushPromises();
    const recievedData = await nominatim('Käthe-Kollwitz-Straße', '12', null);
    expect(recievedData).toStrictEqual(emptyJSON);
  })
})

describe('getDataOfGivenURL', () => {
  test('No input', async() => {
    await flushPromises();
    const recievedData = await getDataOfGivenURL();
    expect(recievedData).toStrictEqual(emptyJSON);
  })

  test('Input is not a url', async() => {
    await flushPromises();
    const recievedData = await getDataOfGivenURL("Wrong");
    expect(recievedData).toStrictEqual(emptyJSON);
  })

  test('Input is null', async() => {
    await flushPromises();
    const recievedData = await getDataOfGivenURL(null);
    expect(recievedData).toStrictEqual(emptyJSON);
  })
})
