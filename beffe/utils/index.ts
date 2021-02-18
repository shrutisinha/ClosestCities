import fs from 'fs';

export const getMockData = (path: string) => {
    return new Promise((resolve, reject) => {
        try {
            const data = JSON.parse(
                fs.readFileSync(
                    path,
                    'utf-8'
                )
            );
            resolve(data);
        } catch (e: any) {
            reject('Failed to fetch data: ' + e.toString());
        }
    });
}