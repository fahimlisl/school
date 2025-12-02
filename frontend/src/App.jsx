import { useState } from "react";
import { Student } from "./Student";
import { useEffect } from "react";
import Search from "./Search";

function App() {
  const [student, setStudent] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchStudents = async () => {
    try {
      // const url = `http://localhost:3030/api/v1/admin/fetchAllStudents/${searchTerm}`;
      const url = `http://localhost:3030/api/v1/admin/fetchAllStudents/3`;
      const response = await fetch(url);
      // console.log(url)
      const resdata = await response.json();
      setStudent(resdata.data);

    } catch (error) {
      throw new Error("got error ", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <>
      <h1>Calling my Api</h1>
      <div>
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      <Student key={student._id} knownStudent={student} />
    </>
  );
}

export default App;
