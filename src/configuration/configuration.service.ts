import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService) {}

  get coverUploadPath(): string {
    return this.configService.get<string>('COVER_UPLOAD_PATH');
  }
}
