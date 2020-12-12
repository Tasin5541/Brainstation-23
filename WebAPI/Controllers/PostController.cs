using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly DataContext dc;
        public String newImageName;

        public PostController(DataContext dc)
        {
            this.dc = dc;
        }

        // Get

        [HttpGet("join")]
        public async Task<IActionResult> postComment()
        {
            var posts = await dc.Posts
                .Join(dc.Comments,
                post=> post.Id,
                comment => comment.postId,
                (post,comment) => new
                {
                    postId = post.Id,
                    postTitle = post.Title,
                    postAuthor = post.Author,
                    postDate = post.PostedOn,
                    commentBody = comment.comment,
                    commentAuthor = comment.userName,
                    commentDate = comment.commentedOn,
                    commentLike = comment.Like,
                    commentDislike = comment.Dislike
                })
                .OrderBy(x => x.postId)
                //.Skip(0*10)
                .Take(10)
                .ToListAsync();
            return Ok(posts);
        }

        [HttpGet("search/{title}")]
        public async Task<IActionResult> postComment(string title)
        {
            var posts = await dc.Posts
                .Join(dc.Comments,
                post => post.Id,
                comment => comment.postId,
                (post, comment) => new
                {
                    postId = post.Id,
                    postTitle = post.Title,
                    postAuthor = post.Author,
                    postDate = post.PostedOn,
                    commentBody = comment.comment,
                    commentAuthor = comment.userName,
                    commentDate = comment.commentedOn,
                    commentLike = comment.Like,
                    commentDislike = comment.Dislike
                })
                .Where(a => a.postTitle == title)
                .ToListAsync();
            return Ok(posts);
        }
    }
}
