import { registerAs } from '@nestjs/config';

// 导出一个配置对象，使用命名空间
export default registerAs('database', () => ({
  host: 'http://localhost',
  port: 1111
}));