import { Container, Button } from "react-bootstrap";
import styles from "./Pagination.module.sass";

const Pagination = ({ next, previous, clickPage }) => {
  return (
    <Container className={styles.Pagination}>
      {previous && (
        <Button
          onClick={() => clickPage(previous)}
          variant="warning"
          className={styles.Button}
        >
          &lt;
        </Button>
      )}
      {next && (
        <Button
          onClick={() => clickPage(next)}
          variant="warning"
          className={styles.Button}
        >
          &gt;
        </Button>
      )}
    </Container>
  );
};
export default Pagination;
