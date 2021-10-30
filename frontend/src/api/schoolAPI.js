const BASE_URL = "http://localhost:8000/";

const getInit = () => {
  return {
    headers: {
      "Content-Type": "application/json",
    },
  };
};

const tryCatchFetch = async (url, init) => {
  try {
    let response = await fetch(url, init);
    if (response.ok) {
      if (response.status !== 204) {
        let data = await response.json();
        return data;
      } else {
        return { success: true };
      }
    }
  } catch (error) {
    console.error(":ERR:", error);
    return null;
  }
};

const getSubjects = async () => {
  let url = `${BASE_URL}api/subjects/`;
  return await tryCatchFetch(url, getInit());
};

const getSubjectById = async (subjectId) => {
  let url = `${BASE_URL}api/subjects/${subjectId}/`;
  return await tryCatchFetch(url, getInit());
};

const getStudentById = async (studentId) => {
  let url = `${BASE_URL}api/students/${studentId}/`;
  return await tryCatchFetch(url, getInit());
};

const addSubject = async (newStudentParams) => {
  let url = `${BASE_URL}api/subjects/`;
  let init = getInit();
  init["method"] = "POST";
  init["body"] = JSON.stringify(newStudentParams);
  return await tryCatchFetch(url, init);
};

const deleteSubject = async (subjectId) => {
  let url = `${BASE_URL}api/subjects/${subjectId}/`;
  let init = getInit();
  init["method"] = "DELETE";
  return await tryCatchFetch(url, init);
};

const addStudent = async (newStudentParams) => {
  let url = `${BASE_URL}api/students/`;
  let init = getInit();
  init["method"] = "POST";
  init["body"] = JSON.stringify(newStudentParams);
  return await tryCatchFetch(url, init);
};

const updateStudent = async (studentId, updatedStudentParams) => {
  let url = `${BASE_URL}api/students/${studentId}/`;
  let init = getInit();
  init["method"] = "PUT";
  init["body"] = JSON.stringify(updatedStudentParams);
  return await tryCatchFetch(url, init);
};

const deleteStudent = async (studentId) => {
  let url = `${BASE_URL}api/students/${studentId}/`;
  let init = getInit();
  init["method"] = "DELETE";
  return await tryCatchFetch(url, init);
};

const myExports = {
  getSubjects,
  getSubjectById,
  getStudentById,
  addSubject,
  deleteSubject,
  addStudent,
  updateStudent,
  deleteStudent,
};

export default myExports;
