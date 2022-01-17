import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { ConfigurationService } from 'src/configuration/configuration.service';

@Injectable()
export class UploadService {

  constructor(private readonly configurationService: ConfigurationService){}

  cover(file, body){
    const writeImage = createWriteStream(
      process.cwd() + this.configurationService.coverUploadPath + body.uname
      );
    return writeImage.write(file.buffer);
  }
}
