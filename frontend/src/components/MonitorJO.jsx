import React from "react";

const MonitorJO = () => {
  const completedJobs = [
    { id: 1, name: "Job X" },
    { id: 2, name: "Job Y" },
  ];

  return (
    <section className="p-4">
      <h2 className="text-2xl font-semibold">Completed Job Orders</h2>
      <ul className="mt-4">
        {completedJobs.map((job) => (
          <li key={job.id} className="border-b py-2">
            {job.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MonitorJO;
