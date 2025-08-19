import React from "react";
import { useParams, Link } from "react-router-dom";
// import posts from "../data/posts";
import { capitalizeFirstLetter } from "../utils/textHelpers";
import Sidebar from "../components/Sidebar";



function CategoryPosts({posts}) {
  const { category } = useParams();
  const filteredPosts = posts.filter(
    (post) => post.cat === category
  );

  if (filteredPosts.length === 0) {
    return (
      <div>
        <h2>No posts found in {capitalizeFirstLetter(category)}</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }
console.log("my log:",posts);
	return (
	    <div className="container">
	    	<div className="row">
	    		<div className="col-md-8">
	    			<hr/>
					<h2>{capitalizeFirstLetter(category)}</h2>
					<hr/>
			      
					{filteredPosts.map((post) => (
						<div key={post.id} className="card mb-3 margin-right-ten">
							<div className="row g-0">

								{/*Image section*/}
								<div className="col-md-4">
								    <img 
								        src={`/asset/blog/${post.image}`} 
								        className="img-fluid rounded-start w-100 h-100 object-fit-cover" 
								        alt="blog post"
								    />
								</div>

								{/*text section*/}
								<div className="col-md-8">
									<div className="card-body">
									    <h5 className="card-title">
									        <Link to={`/post/${post.id}`}>
									            <strong>{post.title}</strong>
									        </Link>
									    </h5>
									    <p className="card-text">
									        {
									            post.content.length > 50
									            ? post.content.substring(0, 50) + "..."
									            : post.content
									        }
									    </p>
									    <p className="card-text">
									        <small className="text-body-secondary">Category: <b>{capitalizeFirstLetter(post.cat)}</b>
									        </small>
									    </p>
									    <Link to={`/post/${post.id}`}>
									        Continue reading
									    </Link>
									</div>
								</div>
							</div>
						</div> 
						// {/*end card*/}
					))}
				</div>
				<div className="col-md-4">
					{/* Sidebar */}
			        <Sidebar posts={posts}/>
				</div>
			</div>
	    </div>
	);
}

export default CategoryPosts;
