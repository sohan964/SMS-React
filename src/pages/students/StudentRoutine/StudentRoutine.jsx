import React, { useMemo } from "react";
import useAcademicYear from "../../../hooks/useAcademicYear";
import useStudentData from "../../../hooks/useStudentData";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const StudentRoutine = () => {
  const [years] = useAcademicYear();
  const [StudentData, studentLoading] = useStudentData();
  const axiosPublic = useAxiosPublic();

  // Get current year and match with academic years using useMemo
  const currentYearId = useMemo(() => {
    if (!years || years.length === 0) return null;

    const currentYear = new Date().getFullYear();
    const matchedYear = years.find(
      (year) => parseInt(year.year_lable) === currentYear,
    );

    return (
      matchedYear?.year_id ||
      years.find((year) => year.is_active)?.year_id ||
      null
    );
  }, [years]);

  // Fetch routine data
  const {
    data: routineData = [],
    isLoading: routineLoading,
    error: routineError,
  } = useQuery({
    queryKey: [
      "routine",
      currentYearId,
      StudentData?.class_id,
      StudentData?.section_id,
    ],
    queryFn: async () => {
      if (
        !currentYearId ||
        !StudentData?.class_id ||
        !StudentData?.section_id
      ) {
        return [];
      }
      const res = await axiosPublic.get(
        `/ClassRoutines/class-routine?Year_id=${currentYearId}&Class_id=${StudentData.class_id}&Section_id=${StudentData.section_id}`,
      );
      return res.data.data || [];
    },
    enabled:
      !!currentYearId && !!StudentData?.class_id && !!StudentData?.section_id,
  });

  // Function to handle print/download
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");

    // Create table HTML for printing
    const tableHTML =
      routineData && routineData.length > 0
        ? `
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <thead>
                    <tr style="background-color: #f2f2f2;">
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Day</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Slot</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Start Time</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">End Time</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Subject</th>
                    </tr>
                </thead>
                <tbody>
                    ${routineData
                      .map(
                        (routine) => `
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">${routine.day_name || "-"}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${routine.slot_number || "-"}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${routine.start_time || "-"}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${routine.end_time || "-"}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${routine.subject_name || "-"}</td>
                        </tr>
                    `,
                      )
                      .join("")}
                </tbody>
            </table>
        `
        : "<p>No routine data available</p>";

    printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Class Routine - ${StudentData.class_name} (${StudentData.section_name})</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        padding: 20px;
                    }
                    h3 {
                        text-align: center;
                        color: #333;
                    }
                    .header-info {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .info-row {
                        margin-bottom: 10px;
                    }
                    @media print {
                        body { margin: 0; }
                        table { page-break-inside: auto; }
                        tr { page-break-inside: avoid; page-break-after: auto; }
                    }
                </style>
            </head>
            <body>
                <div class="header-info">
                    <h3>Class Routine</h3>
                    <div class="info-row"><strong>Academic Year:</strong> ${years.find((y) => y.year_id === currentYearId)?.year_lable || "N/A"}</div>
                    <div class="info-row"><strong>Class:</strong> ${StudentData.class_name} - ${StudentData.section_name}</div>
                    <div class="info-row"><strong>Student ID:</strong> ${StudentData.student_number || "N/A"}</div>
                </div>
                ${tableHTML}
            </body>
            </html>
        `);

    printWindow.document.close();
    printWindow.focus();

    // Wait for the content to load before printing
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  if (studentLoading || routineLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (routineError) {
    return (
      <div className="alert alert-error">
        <span>Error loading routine: {routineError.message}</span>
      </div>
    );
  }

  if (!StudentData?.class_id || !StudentData?.section_id) {
    return (
      <div className="alert alert-warning">
        <span>Student class or section information not available</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">📅 Class Routine</h2>
          <p className="text-sm opacity-90">
            {StudentData.class_name} ({StudentData.section_name})
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-lg bg-white text-blue-600 font-semibold hover:scale-[1.02] transition shadow"
        >
          🖨 Print
        </button>
      </div>

      {/* INFO CARD */}
      <div className="bg-gradient-to-br from-white/70 to-blue-50/60 backdrop-blur-md rounded-2xl shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Academic Year</p>
            <p className="font-semibold text-gray-800">
              {years.find((y) => y.year_id === currentYearId)?.year_lable ||
                "N/A"}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Class & Section</p>
            <p className="font-semibold text-gray-800">
              {StudentData.class_name} - {StudentData.section_name}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Student ID</p>
            <p className="font-semibold text-gray-800">
              {StudentData.student_number || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* TABLE */}
      {routineData && routineData.length > 0 ? (
        <div className="bg-gradient-to-br from-white/70 to-blue-50/60 backdrop-blur-md rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              {/* HEADER */}
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Day</th>
                  <th className="px-4 py-3 text-left">Slot</th>
                  <th className="px-4 py-3 text-left">Start</th>
                  <th className="px-4 py-3 text-left">End</th>
                  <th className="px-4 py-3 text-left">Subject</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {routineData.map((routine, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-blue-50 transition"
                  >
                    <td className="px-4 py-3">{routine.day_name || "-"}</td>
                    <td className="px-4 py-3">{routine.slot_number || "-"}</td>
                    <td className="px-4 py-3">{routine.start_time || "-"}</td>
                    <td className="px-4 py-3">{routine.end_time || "-"}</td>
                    <td className="px-4 py-3 font-medium">
                      {routine.subject_name || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-white/70 to-blue-50/60 backdrop-blur-md rounded-2xl shadow-md p-6 text-center text-gray-500">
          No routine data found for your class and section.
        </div>
      )}
    </div>
  );
};

export default StudentRoutine;
