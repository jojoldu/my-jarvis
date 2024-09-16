import { promises as fs } from 'fs';

export async function getCookie(filePath = 'cookie.json'): Promise<string> {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const { cookie } = JSON.parse(data);
        return cookie;
    } catch (error) {
        console.error('Error reading cookie file:', error);
        throw error; // 에러 발생 시 throw
    }
}
