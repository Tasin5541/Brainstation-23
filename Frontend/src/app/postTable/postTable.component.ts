import { Component, OnInit } from '@angular/core';
import { PostComment } from '../model/postComment';
import { AlertifyService } from '../services/alertify.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-postTable',
  templateUrl: './postTable.component.html',
  styleUrls: ['./postTable.component.css']
})
export class PostTableComponent implements OnInit {

  page = 0;
  tableData: PostComment[];
  postTitles: any[];
  posts = [];
  comment1= [];
  comment2= [];
  comment3= [];
  comment1Count = 0;
  comment2Count = 0;
  comment3Count = 0;
  currentTitle = 'title012';
  searchInput: string;
  isSearch = false;
  searchTitle: string;

  constructor(private postcommentService: PostsService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.postcommentService.getPostComment().subscribe(
      post_data=>{
        this.tableData = post_data;
        console.log(this.tableData);
        this.postTitles = this.tableData.map(item => item.postTitle).filter((value, index, self) => self.indexOf(value) === index);
        for (var index = 0; index < this.tableData.length; ++index)
        {
          if(this.tableData[index].postTitle != this.currentTitle) {
            this.posts.push(this.tableData[index]);
          }
          this.currentTitle = this.tableData[index].postTitle;

          this.tableData[index].postDate = new Date(this.tableData[index].postDate).toLocaleString();
          this.tableData[index].commentDate = new Date(this.tableData[index].commentDate).toLocaleString();
        }

        for(var index2 = 0; index2 < this.tableData.length; ++index2)
        {
          //post1
          if(this.tableData[index2].postTitle === this.posts[0].postTitle){
            this.comment1.push(this.tableData[index2]);
            this.comment1Count = this.comment1Count+1;
          }

          //post2
          if(this.tableData[index2].postTitle === this.posts[1].postTitle){
            this.comment2.push(this.tableData[index2]);
            this.comment2Count = this.comment2Count+1;
          }

          //post3
          if(this.tableData[index2].postTitle === this.posts[2].postTitle){
            this.comment3.push(this.tableData[index2]);
            this.comment3Count = this.comment3Count+1;
          }
        }

      }, error => {
        console.log('error');
      }
    )
  }

  search() {
    //console.log(this.searchInput);
    this.comment1 = [];
    this.comment2 = [];
    this.comment3 = [];
    this.posts = [];
    this.comment1Count = 0;
    this.comment2Count = 0;
    this.comment3Count = 0;
    this.searchPost(this.searchInput);
  }

  searchPost(title) {
    this.searchTitle = title;
    this.isSearch = true;
    this.postcommentService.getPost(title).subscribe(data => {
      if(data) {
        this.tableData = data;
        this.searchInput = '';
        this.postTitles = this.tableData.map(item => item.postTitle).filter((value, index, self) => self.indexOf(value) === index);
        for (var index = 0; index < this.tableData.length; ++index)
        {
          if(this.tableData[index].postTitle != this.currentTitle) {
            this.posts.push(this.tableData[index]);
          }
          this.currentTitle = this.tableData[index].postTitle;

          this.tableData[index].postDate = new Date(this.tableData[index].postDate).toLocaleString();
          this.tableData[index].commentDate = new Date(this.tableData[index].commentDate).toLocaleString();
        }

        for(var index2 = 0; index2 < this.tableData.length; ++index2)
        {
          //post1
          if(this.tableData[index2].postTitle === this.posts[0].postTitle){
            this.comment1.push(this.tableData[index2]);
            this.comment1Count = this.comment1Count+1;
          }
        }

      } else {
        this.alertify.error("No such post");
      }

    });
  }

  refreshSearch() {
    if(this.isSearch) {
      this.comment1Count = 0;
      this.isSearch = false;
      this.fetchPosts();
    }
  }

}
