import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import './Main404Page.scss';

export default (function Main404Page() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div>
      <div className="main-404page-section">
        <div className="container">
          <div className="row">
            <div className="header-404">
              <h1>404 PAGE NOT FOUND</h1>
              <p>The page you were looking for does not exist.</p>
              <div className="button-section">
                <Link className="button" to="/">
                  Continue shopping
                </Link>
              </div>
            </div>
          </div>
          <div className="p-title-a">
            <h3>SIE KÖNNTEN AUCH MÖGEN</h3>
          </div>
        </div>
      </div>
    </div>
  );
});
