import axios from "axios";
import React, { useEffect, useState } from "react";

const Search = () => {
  const [term, setTerm] = useState("react");
  const [debouncedTerm, setDebouncedTerm] = useState(term);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // console.count("render");

  // this is to execute on 'term' value change
  // this will execute the useEffect below on value change
  useEffect(() => {
    const timerId = setTimeout(() => {
      // on new value
      setDebouncedTerm(term);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  // this is to execute on initial render or on mount & whenever value updates
  useEffect(() => {
    const search = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
          params: {
            action: "query",
            list: "search",
            origin: "*",
            format: "json",
            srsearch: debouncedTerm,
          },
        });

        setData(data.query.search);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (debouncedTerm) {
      search();
    }
  }, [debouncedTerm]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);

  // fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=${term}`)
  //   .then(res => res.json())
  //   .then(result => setData(result))
  //   .catch(err => console.log(err))
  //   .finally(() => setLoading(false));

  //     try {
  //       setLoading(true);

  //       const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
  //         // query param object
  //         params: {
  //           action: "query",
  //           list: "search",
  //           format: "json",
  //           origin: "*",
  //           srsearch: term,
  //         },
  //       });
  //       setData(data.query.search);
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   // on rendering first time
  //   if (term && !data.length) {
  //     fetchData();
  //   } else {
  //     const searchTimer = setTimeout(() => {
  //       if (term) {
  //         fetchData();
  //       }
  //     }, 1000);

  //     // note - clean up method gets call first in the code block on next render or mount
  //     // Note - Clean up don't get execute on the initial render of useEffect hook
  //     return () => clearTimeout(searchTimer);
  //   }
  // }, [data.length, term]);

  const displayResults = data.map((item, i) => (
    <div key={item.pageid} className="item">
      <div className="right floated content">
        <a href={`https://en.wikipedia.org?curid=${item.pageid}`} className="ui button">
          Go
        </a>
      </div>

      <div className="content">
        <div className="header">{item.title}</div>

        {/* dangerouslySetInnerHTML is a property that you can use on HTML elements in a React application to programmatically set their content. Instead of using a selector to grab the HTML element, then setting its innerHTML , you can use this property directly on the element */}
        <span dangerouslySetInnerHTML={{ __html: item.snippet }}></span>

        {/* note - anyone can inject third party content on above with XSS attack,
          so, have to make sure it is a trustable source to make our app secure
        */}
      </div>
    </div>
  ));

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label htmlFor="input">Enter Search Term</label>
          <input type="text" className="input" id="input" value={term} onChange={e => setTerm(e.target.value)} />
        </div>
      </div>

      <div className="ui celled list">{displayResults}</div>
    </div>
  );
};

export default Search;
