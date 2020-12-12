import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Blog } from '../model/blog';
import { PostComment } from '../model/postComment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

constructor(private http:HttpClient) { }

// getPost(id: number) {
//   console.log(this.getAllPosts());
//   return this.getAllPosts().pipe(
//     map(post => {
//       return post.find(p => p.Id === id);
//     })
//   );
// }

getPostComment(): Observable<PostComment[]> {
  return this.http.get<PostComment[]>('http://localhost:53744/api/Post/join');
}

getPost(title: string): Observable<PostComment[]> {
  return this.http.get<PostComment[]>('http://localhost:53744/api/Post/search/'+title);
}


}
