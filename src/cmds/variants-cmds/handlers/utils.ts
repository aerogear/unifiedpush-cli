import * as fs from 'fs';

export const fileToString = (filePath: string): string => fs.readFileSync(filePath, 'utf8');
