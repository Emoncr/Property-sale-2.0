"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
function WebsiteNavbar({ tabs }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = parseInt(searchParams.get("tab")) || 1;
  const [selectedTab, setSelectedTab] = useState(currentTab);

  useEffect(() => {
    setSelectedTab(currentTab);
  }, [currentTab]);

  const handleTabChange = (id) => {
    setSelectedTab(id);
    const params = new URLSearchParams(searchParams);
    params.set("tab", id);
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="w-full overflow-x-auto">
      <ul className="flex w-max md:w-full items-center space-x-2 md:space-x-0 px-1 md:px-0">
        {tabs.map((item, index) => (
          <div key={item.id} className="flex items-center">
            <li
              style={{
                background: selectedTab === item.id ? "#EFF6FB" : "",
              }}
              className="flex flex-col items-center justify-center py-2 px-4 rounded-md whitespace-nowrap"
            >
              <a
                className={`text-gray-600 font-primary cursor-pointer hover:text-primary transition duration-300 ${selectedTab === item.id ? "text-primary" : ""
                  }`}
                onClick={() => handleTabChange(item.id)}
              >
                {item.name}
              </a>
            </li>
            {index !== tabs.length - 1 && (
              <div className="hidden md:block border-l-2 border-gray-300 h-6 mx-2 md:mx-6 2xl:mx-12" />
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default WebsiteNavbar;
