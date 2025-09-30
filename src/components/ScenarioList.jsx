"use client";
import { useEffect } from "react";
import useScenarioStore from "@/store/scenarioStore";
import { useChatStore } from "@/store/chatStore";


export default function ScenarioList() {
  const { scenarios, loading, error, fetchScenarios } = useScenarioStore();
  const { addMessage } = useChatStore();

  useEffect(() => {
    fetchScenarios();
  }, [fetchScenarios]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleOptionClick = (scenario, option) => {
    // Tambahkan pesan dari user
    addMessage({ sender: "user", text: option.userQuestion });

    // Tambahkan balasan bot
    addMessage({ sender: "bot", text: option.botAnswer });
  };

  return (
    <div>
      {scenarios.map((sc) => (
        <div key={sc.id} className="p-4 border mb-2 rounded">
          <h2 className="font-bold">{sc.skillGap}</h2>
          <p>{sc.scenario}</p>

          {/* opsi pilihan user */}
          {sc.normalResponses?.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionClick(sc, opt)}
              className="mt-2 mr-2 px-3 py-1 bg-blue-500 text-white rounded"
            >
              {opt.userQuestion}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
