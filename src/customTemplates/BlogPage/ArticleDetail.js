import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useLazyQuery } from '@apollo/client';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import axios from 'axios';
import { getRecentArticles } from '../../components/shared/query/query.js';
import RecentlyAddedItem from './RecentlyAddedItem';
import CommentList from './CommentList';
import './BlogPage.scss';

export default (props) => {
  const { article, handle, blogHandle } = props;
  if (!article) return <h1>article not found</h1>;
  const { id, image, title, publishedAt, blog, contentHtml } = article;
  const shareUrl = `https://gobicashmere.com/us/blogs/${blogHandle}/${handle}`;

  let imageSrc = '';
  if (image) {
    imageSrc = image.originalSrc.replace('.jpg', `_${window.innerWidth}x.jpg`);
  }

  const shopify = false;

  const [recentArticles, setRecentArticles] = useState([]);
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  const [getRecentArticlesQuery, { data: getRecentArticlesData }] = useLazyQuery(getRecentArticles);

  useEffect(() => {
    // recent articles
    getRecentArticlesQuery();
    if (getRecentArticlesData) {
      let recents = getRecentArticlesData.articles.edges
        .map((edge) => edge.node)
        .filter(({ handle: recentHandle }) => recentHandle !== handle);
      recents = recents.slice(0, 2);
      setRecentArticles(recents);
    }
  }, [getRecentArticlesData, getRecentArticlesQuery, handle, id]);

  useEffect(() => {
    axios
      .get(
        `https://us-central1-gobicashmere-sizechart.cloudfunctions.net/getComments?blog=${blogHandle}&article=${handle}`,
      )
      .then((response) => {
        setComments(response.data);
      });
  }, [blogHandle, handle]);
  const handleChange = (e) => {
    if (e.target.name === 'name') {
      setCommentName(e.target.value);
    } else if (e.target.name === 'email') {
      setCommentEmail(e.target.value);
    } else {
      setCommentText(e.target.value);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!commentName || !commentEmail || !commentText) {
      return;
    }
    axios
      .post('https://us-central1-gobicashmere-sizechart.cloudfunctions.net/postComment', {
        blog: blogHandle,
        article: handle,
        email: commentEmail,
        name: commentName,
        content: commentText,
      })
      .then(() => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="blog-page">
      <section id="read">
        <div className="slide desktop">
          {image && <img src={imageSrc} alt={title} />}
          <div className="detail">
            <nav aria-label="breadcrumb">
              <ol className="cus_breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/us/">
                    Home
                    {' / '}
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/us/blogs">
                    {' '}
                    Blogs
                    {' / '}
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {blog && blog.title}
                </li>
              </ol>
            </nav>
            <div className="body">
              <h2>{title}</h2>
              <div className="cat_date">
                <span className="cat">{blog && blog.title}</span>
                <span className="date">{moment(publishedAt).format('MMM D, YYYY')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="slide mobile">
          {image && <img src={imageSrc} alt={title} />}
          <div className="detail">
            <nav aria-label="breadcrumb">
              <ol className="cus_breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                  {' / '}
                </li>
                <li className="breadcrumb-item">
                  <a href="/us/blogs">Blogs</a>
                  {' / '}
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {blog && blog.title}
                </li>
              </ol>
            </nav>
            <div className="body">
              <h2>{title}</h2>
              <div className="cat_date">
                <span className="cat">{blog && blog.title}</span>
                <span className="date">{moment(publishedAt).format('MMM D, YYYY')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="detail" dangerouslySetInnerHTML={{ __html: contentHtml }} />
              <div className="social">
                <FacebookShareButton url={shareUrl} aria-label="Facebook Share">
                  <a href="/">
                    <span className="fb">
                      <svg width="20" height="18" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M3.65188 0.251221C1.6289 0.251221 0 1.88012 0 3.9031V16.5994C0 18.6223 1.6289 20.2512 3.65188 20.2512H10.5331V12.4325H8.46564V9.61748H10.5331V7.21248C10.5331 5.32298 11.7547 3.5881 14.5688 3.5881C15.7081 3.5881 16.5506 3.69748 16.5506 3.69748L16.4844 6.32624C16.4844 6.32624 15.6251 6.31812 14.6875 6.31812C13.6727 6.31812 13.51 6.78568 13.51 7.56188V9.6175H16.565L16.4319 12.4325H13.51V20.2513H16.3481C18.3711 20.2513 20 18.6224 20 16.5994V3.90312C20 1.88014 18.3711 0.251241 16.3481 0.251241H3.65186L3.65188 0.251221Z"
                          fill="white"
                        />
                      </svg>
                      <span>Share facebook</span>
                    </span>
                  </a>
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} aria-label="Twitter Share">
                  <a href="/asd">
                    <span className="tw">
                      <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M20 2.18129C19.2645 2.49856 18.4641 2.7269 17.6397 2.81583C18.4956 2.30732 19.1366 1.50396 19.4424 0.556482C18.6392 1.03428 17.7593 1.36933 16.8417 1.54675C16.4582 1.13676 15.9944 0.810153 15.4792 0.587266C14.9639 0.364378 14.4083 0.249991 13.8469 0.251231C11.5755 0.251231 9.74883 2.09236 9.74883 4.3517C9.74883 4.66897 9.78729 4.98624 9.84978 5.29149C6.44874 5.11363 3.41546 3.48882 1.39887 1.00114C1.03143 1.62875 0.838874 2.34335 0.841245 3.0706C0.841245 4.49351 1.56472 5.74817 2.66795 6.48606C2.0178 6.46045 1.38287 6.28175 0.814806 5.96449V6.01496C0.814806 8.00751 2.22329 9.65876 4.10047 10.0385C3.74801 10.1301 3.38543 10.1769 3.02127 10.1779C2.75448 10.1779 2.5021 10.1515 2.24733 10.1154C2.76649 11.7402 4.27833 12.9204 6.0786 12.9588C4.67011 14.0621 2.9059 14.711 0.990266 14.711C0.646557 14.711 0.329287 14.699 0 14.6606C1.81709 15.8263 3.97308 16.4993 6.29492 16.4993C13.8325 16.4993 17.957 10.2548 17.957 4.83482C17.957 4.65695 17.957 4.47909 17.945 4.30123C18.7429 3.71716 19.4424 2.99369 20 2.18129Z"
                          fill="white"
                        />
                      </svg>
                      <span>Share twitter</span>
                    </span>
                  </a>
                </TwitterShareButton>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h2 className="bg_tt">Recently Added</h2>
            </div>
            {recentArticles
              .filter(({ id: recentId }) => recentId !== id)
              .map((article) => (
                <RecentlyAddedItem key={article.handle} article={article} />
              ))}

            <div className="col-12 desktop">
              <div className="break_line" />
            </div>
            <div className="col-12 gray_background">
              <div className="comment">
                <h2 className="bg_tt">Comment</h2>
                <div className="row">
                  <div className="col-md-8">
                    <form onSubmit={onSubmit}>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>Name</label>
                          <input
                            name="name"
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            onChange={(e) => handleChange(e)}
                            required
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label>Email</label>
                          <input
                            name="email"
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            onChange={(e) => handleChange(e)}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label style={{ marginBottom: '.5rem', display: 'block' }}>Comment</label>
                        <textarea
                          name="text"
                          className="form-control"
                          rows="4"
                          placeholder="Comment"
                          onChange={(e) => handleChange(e)}
                          required
                        />
                      </div>
                      <button aria-label="Comment" type="submit" className="btn">
                        Comment
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <CommentList comments={comments} />
          </div>
        </div>
      </section>
    </div>
  );
};
