import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { getBlogs } from '../../components/shared/query/query.js';
import BlogSwiper from './BlogSwiper';
import BlogList from './BlogList';
import './BlogPage.scss';
import Swiper from 'react-id-swiper';

function BlogPage() {
  const params = {
    slidesPerView: 2,
    spaceBetween: 2,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 1,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 2,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 2,
      },
      2050: {
        slidesPerView: 2,
        spaceBetween: 2,
      },
    },
  };
  const [notfound, setNotfound] = useState(false);
  const [last2Articles, setLast2Articles] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [blogSet, setBlogSet] = useState({});
  const [articles, setArticles] = useState([]);
  const [blog, setBlog] = useState({
    handle: 'news',
  });

  const [getBlogsQuery, { data: getBlogsData }] = useLazyQuery(getBlogs);

  const onBlogClick = (blogHandle) => {
    const blg = blogSet[blogHandle];
    if (blg) {
      setBlog(blg);
      setArticles(blg.articles.edges.map((edge) => edge.node));
    }
  };

  useEffect(() => {
    getBlogsQuery({});
    if (getBlogsData) {
      const blogIndex = {};
      const blogList = [];
      getBlogsData.blogs.edges.forEach((edge) => {
        const blog = edge.node;
        blogList.push(blog);
        blogIndex[blog.handle] = blog;
      });
      setLast2Articles(getBlogsData.articles.edges.map((edge) => edge.node));
      setBlogs(blogList);
      setBlogSet(blogIndex);
      const blg = blogIndex[blog.handle];
      if (blg) {
        setArticles(blg.articles.edges.map((edge) => edge.node));
      } else {
        setNotfound(true);
      }
    }
  }, [getBlogsData, getBlogsQuery, blog]);

  return (
    <div className="blog-page">
      <section id="blog">
        <div className="slider-container">
          <div className="blog-slider-desk">
            {last2Articles && last2Articles.map((article) => <BlogSwiper key={article.handle} article={article} />)}
          </div>
        </div>
        <div className="slider-container">
          <div className="blog-slider-mobile">
            <Swiper
              swiperOptions={{
                slidesPerView: 2,
              }}
              {...params}
            >
              {last2Articles && last2Articles.map((article) => <BlogSwiper key={article.handle} article={article} />)}
            </Swiper>
          </div>
        </div>

        <div className="container blog-list">
          <div className="row">
            <div className="col-12">
              <div className="category">
                {blogs &&
                  blogs.map((blg) => (
                    <div
                      key={blg.handle}
                      className={`links ${blg.handle === blog.handle ? 'active' : ''}`}
                      onClick={() => onBlogClick(blg.handle)}
                    >
                      {blg.title}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <BlogList articles={articles} />
        </div>
      </section>
    </div>
  );
}

export default BlogPage;
