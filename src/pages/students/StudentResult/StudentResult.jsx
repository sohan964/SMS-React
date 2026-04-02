import React, { useState } from "react";
import useGradeList from "../../../hooks/useGradeList";
import useStudentData from "../../../hooks/useStudentData";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaPrint } from "react-icons/fa";
import "./StudentResult.css";

const StudentResult = () => {
  const [, loading] = useGradeList();
  const [studentData] = useStudentData();
  const axiosSecure = useAxiosSecure();
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Calculate GPA and result status from subject results
  const calculateGpaAndStatus = (results) => {
    // console.log('Calculating GPA and status for results:', results);
    if (results.length === 0) return { gpa: "0.00", status: "PASSED" };

    // Calculate GPA
    const totalGradePoints = results.reduce(
      (sum, subject) => sum + subject.grade_point,
      0,
    );
    const calculatedGpa = (totalGradePoints / results.length).toFixed(2);

    // Determine result status:
    // If any subject has grade_name "F", the result is FAILED
    // If no subjects have grade_name "F", the result is PASSED
    const hasFailed = results.some((subject) => subject.grade_name === "F");
    const status = hasFailed ? "FAILED" : "PASSED";
    return { gpa: calculatedGpa, resultStatus: status };
  };

  // Fetch subject results
  const { data: subjectResults = [], isLoading: resultsLoading } = useQuery({
    queryKey: ["subjectResults", studentData?.current_enrollment_id],
    queryFn: async () => {
      if (!studentData?.current_enrollment_id) return [];
      const res = await axiosSecure.get(
        `Results/get-subjects-results/${studentData.current_enrollment_id}`,
      );
      return res.data.data;
    },
    enabled: !!studentData?.current_enrollment_id,
  });

  // Fetch detailed results for a specific subject
  const { data: detailedResults = [], isLoading: detailsLoading } = useQuery({
    queryKey: [
      "detailedResults",
      selectedSubject?.subject_id,
      studentData?.current_enrollment_id,
    ],
    queryFn: async () => {
      if (!selectedSubject?.subject_id || !studentData?.current_enrollment_id)
        return [];
      const res = await axiosSecure.get(
        `Results/get-details-result/${studentData.current_enrollment_id}/${selectedSubject.subject_id}`,
      );
      return res.data.data;
    },
    enabled:
      !!selectedSubject?.subject_id && !!studentData?.current_enrollment_id,
  });

  // Calculate GPA and result status
  const { gpa, resultStatus } = calculateGpaAndStatus(subjectResults);

  // Format date of birth
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Format gender
  const formatGender = (gender) => {
    return gender === "M" ? "Male" : gender === "F" ? "Female" : gender;
  };

  // Print function
  const handlePrint = () => {
    window.print();
  };

  // Handle subject click to open modal
  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    // Use DaisyUI's showModal method
    document.getElementById("subject_details_modal").showModal();
  };

  if (loading || resultsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-gray-200 py-10">
  <div className="a4-page bg-white shadow-lg">
      {/* Print button - hidden when printing */}
      <div className="flex justify-between mb-4 print:hidden">
        <button
          onClick={handlePrint}
          className="btn bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
        >
          <FaPrint />
          Print Result
        </button>
      </div>

      {/* Result Sheet */}
      <div className="a4-page result-sheet">

  {/* WATERMARK */}
  <div className="absolute inset-0 opacity-5 pointer-events-none text-center text-6xl font-bold rotate-[-30deg] flex items-center justify-center">
    RESULT
  </div>

  {/* HEADER */}
  <div className="text-center border-b border-gray-400 pb-3 relative z-10">
    <h1 className="font-bold text-lg uppercase tracking-wide">
      Board of Intermediate and Secondary Education
    </h1>
    <p className="text-sm">Bangladesh</p>

    <h2 className="text-blue-800 font-bold underline mt-2">
      Academic Transcript
    </h2>
  </div>

  {/* TOP INFO */}
  <div className="flex justify-between mt-4 text-sm relative z-10">

    {/* LEFT */}
    <div className="space-y-1 w-2/3">
      <p><b>Name:</b> {studentData.first_name} {studentData.last_name}</p>
      <p><b>Student ID:</b> {studentData.student_number}</p>
      <p><b>Class:</b> {studentData.class_name}</p>
      <p><b>Section:</b> {studentData.section_name}</p>
      <p><b>Date of Birth:</b> {formatDate(studentData.dob)}</p>
      <p><b>Gender:</b> {formatGender(studentData.gender)}</p>
    </div>

    {/* RIGHT (GRADE SCALE) */}
    <div className="w-1/3 text-xs">

      <table className="w-full border border-gray-600 text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border">Grade</th>
            <th className="border">Marks</th>
            <th className="border">Point</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border">A+</td><td className="border">80-100</td><td className="border">5</td></tr>
          <tr><td className="border">A</td><td className="border">70-79</td><td className="border">4</td></tr>
          <tr><td className="border">A-</td><td className="border">60-69</td><td className="border">3.5</td></tr>
          <tr><td className="border">B</td><td className="border">50-59</td><td className="border">3</td></tr>
          <tr><td className="border">C</td><td className="border">40-49</td><td className="border">2</td></tr>
          <tr><td className="border">D</td><td className="border">33-39</td><td className="border">1</td></tr>
          <tr><td className="border">F</td><td className="border">0-32</td><td className="border">0</td></tr>
        </tbody>
      </table>

      <div className="mt-2">
        <p><b>Result:</b> {resultStatus}</p>
        <p><b>GPA:</b> {gpa}</p>
      </div>
    </div>

  </div>

  {/* SUBJECT TABLE */}
  <div className="mt-6 relative z-10">
    <table className="w-full border border-gray-600 text-sm">

  <thead>
    <tr className="bg-gray-200 text-center">
      <th className="border p-1">SL</th>
      <th className="border p-1 text-left">Subject</th>
      <th className="border p-1">Marks</th>
      <th className="border p-1">Grade</th>
      <th className="border p-1">Point</th>
      <th className="border p-1">GPA</th> {/* 👈 NEW */}
    </tr>
  </thead>

  <tbody className="text-center">

    {subjectResults.map((subject, index) => {

      const isFirstRow = index === 0;

      return (
        <tr key={index}>
          <td className="border">{index + 1}</td>

          <td
            className="border text-left pl-2 cursor-pointer hover:underline"
            onClick={() => handleSubjectClick(subject)}
          >
            {subject.subject_name}
          </td>

          <td className="border">{subject.total_marks}</td>

          <td className="border font-bold">
            {subject.grade_name}
          </td>

          <td className="border">{subject.grade_point}</td>

          {/* ✅ GPA BOX (only once with rowspan) */}
          {isFirstRow && (
            <td
              rowSpan={subjectResults.length}
              className="border align-middle text-3xl font-bold text-center tracking-wide"
            >
              {gpa}
            </td>
          )}
        </tr>
      );
    })}

  </tbody>
</table>
  </div>

  {/* SIGNATURE */}
  <div className="flex justify-between mt-10 text-sm relative z-10">

    <div className="text-center">
      <div className="h-12 border-b border-gray-600 mb-1"></div>
      <p>Class Teacher</p>
    </div>

    <div className="text-center">
      <div className="h-12 border-b border-gray-600 mb-1"></div>
      <p>Principal</p>
    </div>

  </div>

  {/* FOOTER */}
  <div className="flex justify-between mt-6 text-xs relative z-10">
    <p>Date: {new Date().toLocaleDateString()}</p>
    <p className="italic">Controller of Examinations</p>
  </div>

</div>

      {/* Modal for Subject Details */}
      <dialog id="subject_details_modal" className="modal">
        <div className="modal-box w-11/12 max-w-4xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-green-700 mb-4">
            Your {selectedSubject?.subject_name} - Exam Details
          </h3>

          {detailsLoading ? (
            <div className="flex justify-center py-8">
              <div className="loading loading-spinner loading-md"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr className="bg-green-100">
                    <th className="border border-green-300 text-green-700">
                      Exam Type ID
                    </th>
                    <th className="border border-green-300 text-green-700">
                      Exam Type
                    </th>
                    <th className="border border-green-300 text-green-700">
                      Marks
                    </th>
                    <th className="border border-green-300 text-green-700">
                      Weight (%)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {detailedResults.map((exam, index) => (
                    <tr key={index}>
                      <td className="border border-green-200 text-center">
                        {exam.exam_type_id}
                      </td>
                      <td className="border border-green-200">
                        {exam.type_name}
                      </td>
                      <td className="border border-green-200 text-center">
                        {exam.marks !== null ? (
                          <span className="font-semibold text-blue-600">
                            {exam.marks}
                          </span>
                        ) : (
                          <span className="text-gray-500 italic">
                            Marks not submitted
                          </span>
                        )}
                      </td>
                      <td className="border border-green-200 text-center">
                        {exam.weight_percentage}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn bg-green-600 hover:bg-green-700 text-white">
                Close
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
     </div>
</div>
  );
};

export default StudentResult;
