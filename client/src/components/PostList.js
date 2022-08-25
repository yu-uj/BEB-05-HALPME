import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';

import Pagebar from "./Pagebar";
import '../assets/styles/PostList.css'

function PostList() {
  let limit = 5   // 페이지 당 게시글 수
  let postList = useSelector((state) => state.posts.posts)
  let [posts, setPosts] = useState(postList.slice(0, limit))

  let navigate = useNavigate()

  let getPage = (page) => {
    let result = postList.slice((page-1)*limit, page*limit)
    setPosts(result)
  }
  let toPostDetail = (postid) => {
    navigate(`/detail/${postid}`, { replace: true });
  }

  return (
    <div className="PostList">
      {/* borded 옵션 있음 */}
      <Table className="postlist-table" responsive>
        <thead>
          <tr>
            <th className="postlist-td-id">#</th>
            <th className="postlist-td-category">주제</th>
            <th className="postlist-td-title">제목</th>
            <th className="postlist-td-author">작성자</th>
            <th className="postlist-td-status">상태</th>
            <th className="postlist-td-created-at">작성일</th>
          </tr>
        </thead>
        <tbody>
          {
            posts.map((post) => {
              if (post.status)
              return (
                <tr key={post.postid} onClick={() => toPostDetail(post.postid)}>
                  <td className="postlist-td-id">{post.postid}</td>
                  <td className="postlist-td-category">{post.category}</td>
                  <td className="postlist-td-title" >{post.title}</td>
                  <td className="postlist-td-author">{post.author}</td>
                  <td className="postlist-td-status">
                    <span id="postlist-td-status-btn-1" className="badge rounded-pill" title='질문이 종료되었습니다.'>답변완료</span>
                  </td>
                  <td className="postlist-td-created-at">{post.created_at}</td>
                </tr>
              )
              else
              return (
                <tr key={post.postid} onClick={() => toPostDetail(post.postid)}>
                <td className="postlist-td-id">{post.postid}</td>
                <td className="postlist-td-category">{post.category}</td>
                <td className="postlist-td-title" >{post.title}</td>
                <td className="postlist-td-author">{post.author}</td>
                <td className="postlist-td-status">
                  <span className="badge rounded-pill text-bg-secondary" title='답변이 없거나 채틱된 답변이 없습니다.'>답변대기</span>
                </td>
                <td className="postlist-td-created-at">{post.created_at}</td>
              </tr>
              )
            })
          }
        </tbody>
      </Table>
        
      <Pagebar getPage={getPage} limit={limit} />
    </div>
  );
}
  
export default PostList;