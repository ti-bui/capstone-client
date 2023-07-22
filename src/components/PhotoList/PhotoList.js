import "./photoList.scss";
import { Link } from "react-router-dom";
import ProgressiveImage from "react-progressive-image";

const PhotoList = ({ albums }) => {
  return (
    <section className="albumsList">
      {albums.map((album) => {
        return (
          <Link
            to={`/${album.id}`}
            key={album.id}
            className="albumsList__album"
          >
            <div className="albumsList__thumbnail">
              <ProgressiveImage
                className="albumsList__thumbnail-img"
                src={album.thumbnail}
                alt={album.album_name}
              ></ProgressiveImage>
            </div>

            <h3 className="albumsList__info">
              / {album.album_name}-{album.year_taken}
            </h3>
          </Link>
        );
      })}
    </section>
  );
};

export default PhotoList;
