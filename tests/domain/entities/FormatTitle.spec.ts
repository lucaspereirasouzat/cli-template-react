import { describe, it, expect } from 'vitest';
import { FormatTitle } from '../../../src/domain/entities/FormatTitle';

describe('FormatTitle', () => {
  it('should format camelCase to spaced and capitalized words', () => {
    const ft = new FormatTitle('myTestTitle');
    expect(ft.getFormattedTitle()).toBe('My Test Title');
  });

  it('should format PascalCase to spaced and capitalized words', () => {
    const ft = new FormatTitle('MyTestTitle');
    expect(ft.getFormattedTitle()).toBe('My Test Title');
  });

  it('should normalize formats correctly', () => {
    const ft = new FormatTitle('myTestTitle');
    const formats = ft.normalizeFormats();
    expect(formats.camelCase).toBe('myTestTitle');
    expect(formats.PascalCase).toBe('MyTestTitle');
    expect(formats.snake_case).toBe('my_test_title');
    expect(formats['kebab-case']).toBe('my-test-title');
  });

  it('should get specific format', () => {
    const ft = new FormatTitle('myTestTitle');
    expect(ft.getFormat('camelCase')).toBe('myTestTitle');
    expect(ft.getFormat('PascalCase')).toBe('MyTestTitle');
    expect(ft.getFormat('snake_case')).toBe('my_test_title');
    expect(ft.getFormat('kebab-case')).toBe('my-test-title');
  });

  it('should get camelCase format', () => {
    const ft = new FormatTitle('my_test_title');
    expect(ft.getFormat('camelCase')).toBe('myTestTitle');
  });

  it('should get PascalCase format', () => {
    const ft = new FormatTitle('my_test_title');
    expect(ft.getFormat('PascalCase')).toBe('MyTestTitle');
  });

  it('should get snake_case format', () => {
    const ft = new FormatTitle('myTestTitle');
    expect(ft.getFormat('snake_case')).toBe('my_test_title');
  });

  it('should return empty string for kebab-case (not kebab_case)', () => {
    const ft = new FormatTitle('myTestTitle');
    expect(ft.getFormat('kebab-case')).toBe('my-test-title');
  });

  it('should return empty string for unknown format', () => {
    const ft = new FormatTitle('myTestTitle');
    // @ts-expect-error testing unknown format
    expect(ft.getFormat('unknown')).toBe('');
  });

  it('should split camelCase into words', () => {
    const ft = new FormatTitle('myTestTitle');
    expect(ft.splitNameToWords()).toEqual(['my', 'Test', 'Title']);
  });

  it('should split PascalCase into words', () => {
    const ft = new FormatTitle('MyTestTitle');
    expect(ft.splitNameToWords()).toEqual(['My', 'Test', 'Title']);
  });

  it('should split snake_case into words', () => {
    const ft = new FormatTitle('my_test_title');
    expect(ft.splitNameToWords()).toEqual(['my', 'test', 'title']);
  });

  it('should split kebab-case into words', () => {
    const ft = new FormatTitle('my-test-title');
    expect(ft.splitNameToWords()).toEqual(['my', 'test', 'title']);
  });

  it('should split words separated by space', () => {
    const ft = new FormatTitle('my test title');
    expect(ft.splitNameToWords()).toEqual(['my', 'test', 'title']);
  });

  it('should handle single word', () => {
    const ft = new FormatTitle('word');
    expect(ft.splitNameToWords()).toEqual(['word']);
  });

  it('should handle empty string', () => {
    const ft = new FormatTitle('');
    expect(ft.splitNameToWords()).toEqual([]);
  });

  it('should normalize formats for camelCase', () => {
    const ft = new FormatTitle('myTestTitle');
    expect(ft.normalizeFormats()).toEqual({
      camelCase: 'myTestTitle',
      PascalCase: 'MyTestTitle',
      snake_case: 'my_test_title',
      'kebab-case': 'my-test-title',
    });
  });

  it('should normalize formats for PascalCase', () => {
    const ft = new FormatTitle('MyTestTitle');
    expect(ft.normalizeFormats()).toEqual({
      camelCase: 'myTestTitle',
      PascalCase: 'MyTestTitle',
      snake_case: 'my_test_title',
      'kebab-case': 'my-test-title',
    });
  });

  it('should normalize formats for snake_case', () => {
    const ft = new FormatTitle('my_test_title');
    expect(ft.normalizeFormats()).toEqual({
      camelCase: 'myTestTitle',
      PascalCase: 'MyTestTitle',
      snake_case: 'my_test_title',
      'kebab-case': 'my-test-title',
    });
  });

  it('should normalize formats for kebab-case', () => {
    const ft = new FormatTitle('my-test-title');
    expect(ft.normalizeFormats()).toEqual({
      camelCase: 'myTestTitle',
      PascalCase: 'MyTestTitle',
      snake_case: 'my_test_title',
      'kebab-case': 'my-test-title',
    });
  });

  it('should normalize formats for single word', () => {
    const ft = new FormatTitle('word');
    expect(ft.normalizeFormats()).toEqual({
      camelCase: 'word',
      PascalCase: 'Word',
      snake_case: 'word',
      'kebab-case': 'word'
    });
  });

  it('should normalize formats for empty string', () => {
    const ft = new FormatTitle('');
    expect(ft.normalizeFormats()).toEqual({
      camelCase: '',
      PascalCase: '',
      snake_case: '',
      'kebab-case': '',
    });
  });
});
