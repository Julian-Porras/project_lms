function table1({ headers = [], data = [] }) {
    return (
      <table border="1" cellPadding="8">
        <thead>
          <tr>{headers.map((head, i) => <th key={i}>{head}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => <td key={j}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }