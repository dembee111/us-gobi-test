import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby';

const Link = ({ children, to, activeClassName, partiallyActive, ...other }) => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      allGobiShopifyProduct {
        edges {
          node {
            handle
          }
        }
      }
    }
  `);

  let internal = false;
  for (let singleNode of data.allGobiShopifyProduct.edges) {
    if (singleNode.node.handle === to.replace('/products/', '')) {
      internal = true;
      break;
    }
  }
  if (internal) {
    return (
      <GatsbyLink to={to} activeClassName={activeClassName} partiallyActive={partiallyActive} {...other}>
        {children}
      </GatsbyLink>
    );
  }
  return (
    <a href={'/us' + to} {...other}>
      {children}
    </a>
  );
};

export default Link;
