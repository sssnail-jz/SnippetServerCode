import { Injectable } from '@nestjs/common';

@Injectable()
export class SnippetService {
  snippetList(){
    return "this is snippet list!"
  }
  snippetCreate(body){
    return "create successful!"
  }
  snippetPut(id, body){
    return "modify snippet successful!"
  }
  snippetDelete(id){
    return "delete Snippet successful!"
  }
}
