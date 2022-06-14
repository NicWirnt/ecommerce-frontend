import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";

const CategoryTable = () => {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Category Name</th>
          <th>Parent</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>
            <Button variant="warning">Edit</Button>{" "}
            <Button variant="danger">Delete</Button>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default CategoryTable;
