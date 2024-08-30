import { Routes, Route, Link, useSearchParams } from 'react-router-dom';
import Card from '../UI/Card/Card';
import GalleryPicture from './GalleryPicture';
import styles from './Gallery.module.css';
import Button from '../UI/Button/Button';

const pictureIds = [
  { id: 61 },
  { id: 62 },
  { id: 63 },
  { id: 64 },
  { id: 65 }
]

function Gallery() {
  const [ , setSearchParams ] = useSearchParams();

  return (
    <div className={styles.container}>
      <Card className={styles.gallery}>
        <h1>Galería</h1>
        <ul>
          {pictureIds.map(({ id }) => (
              <li key={id}>
                <Link to={`/gallery/${id}`}>Imagen #{id}</Link>
              </li>
            ))
          }
        </ul>
        <div className={styles.actions}>
          <Button onClick={() => setSearchParams({ grayscale: true })}>
            B/N
          </Button>
          <Button onClick={() => setSearchParams({ grayscale: false })}>
            Color
          </Button>
        </div>
      </Card>
      <Routes>
        <Route path=':imageId' element={<GalleryPicture />} />
      </Routes>
    </div>
  )
};

export default Gallery;