import React from "react";

const CurrentJO = () => {
  const currentJobs = [
    { id: 1, name: "Job A" },
    { id: 2, name: "Job B" },
  ];

  return (
    <section className="p-4">
      <h2 className="text-2xl font-semibold">Current Job Orders</h2>
      <ul className="mt-4">
        {currentJobs.map((job) => (
          <li key={job.id} className="border-b py-2">
            {job.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CurrentJO;
