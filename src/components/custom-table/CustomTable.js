import Table from "react-bootstrap/Table";

export const CustomTable = ({ tableHeader = [], tableData = [] }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>No</th>
          {tableHeader.map((head, i) => (
            <th key={i}>{head}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((data, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            {Object.keys(data).map((key, index) => (
              <>
                <td key={index}>{data[key]}</td>
              </>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
