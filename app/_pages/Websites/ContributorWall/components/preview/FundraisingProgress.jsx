"use client";
import { Card } from "@/components/ui/card";
import LineIndicator from "./LineIndicator";
import CircularIndicator from "./CircularIndicator";
import GraphicalIndication from "./GraphicalIndication";

export default function FundraisingProgress({ displayType, formState }) {
  const fundraisingData = {
    goal: 2000,
    raised: 1370,
    percentFunded: 68.5,
    supporters: 4,
    recentDonations: [
      {
        id: 1,
        customerFirstName: "Liam Harris",
        initials: "L H",
        customerLastName: "Harris",
        customerAddress: "New York, NY",
        createdOn: "2023-10-01",
        total: 300,
      },
      {
        id: 2,
        customerFirstName: "Sarah Johnson",
        initials: "S J",
        customerLastName: "Johnson",
        customerAddress: "Los Angeles, CA",
        createdOn: "2023-09-28",
        total: 150,
      },
      {
        id: 3,
        customerFirstName: "Michael Chen",
        initials: "M C",
        customerLastName: "Chen",
        customerAddress: "Chicago, IL",
        createdOn: "2023-09-25",
        total: 500,
      },
      {
        id: 4,
        customerFirstName: "Emma Wilson",
        initials: "E W",
        customerLastName: "Wilson",
        customerAddress: "Austin, TX",
        createdOn: "2023-09-22",
        total: 420,
      },
    ],
  };

  const {
    primaryColor,
    secondaryColor,
    widgetColor,
    cardBgColor,
    buttonBgColor,
    textColor,
    showDonationProgress,
    showRecentDonations,
    showDonationDate,
    anonymousDonor,
    showLoadButton,
  } = formState;

  const currencySymbol = "$";
  return (
    <Card
      className="p-5 max-w-md mx-auto shadow-none border-none"
      style={{ backgroundColor: widgetColor }}
    >
      <>
        {/* Progress Bar */}
        {showDonationProgress && (
          <div>
            {
              {
                lineBarIndicator: (
                  <LineIndicator
                    fundraisingData={fundraisingData}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                  />
                ),
                circularIndicator: (
                  <CircularIndicator
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                    textColor={textColor}
                    totalDonations={fundraisingData.raised}
                    targetDonation={fundraisingData.goal}
                    fundraisingData={fundraisingData}
                    currencySymbol={currencySymbol}
                  />
                ),
                graphicalIndicator: (
                  <GraphicalIndication
                    fundraisingData={fundraisingData}
                    primaryColor={primaryColor}
                  />
                ),
              }[displayType]
            }
          </div>
        )}
      </>
      {/* Recent Donations */}
      {showRecentDonations && (
        <div>
          <div className="text-sm font-medium mb-2 font-primary">
            Recent Donations
          </div>
          <div className="space-y-3">
            {fundraisingData.recentDonations.map((donation, index) => (
              <div
                key={index}
                className="flex rounded-lg shadow-lg text-xs overflow-hidden font-primary"
              >
                <div
                  className="flex w-[20%] justify-center items-center rounded-l-lg"
                  style={{ backgroundColor: secondaryColor }}
                >
                  <p
                    className="font-bold text-[15px] font-primary"
                    style={{ color: primaryColor }}
                  >
                    {anonymousDonor
                      ? "AN"
                      : `${donation.customerFirstName
                          .charAt(0)
                          .toUpperCase()} ${donation.customerLastName
                          .charAt(0)
                          .toUpperCase()}`}
                  </p>
                </div>

                <div
                  className="w-full p-2 flex justify-between items-center"
                  style={{ backgroundColor: cardBgColor }}
                >
                  <div className="flex flex-col">
                    <p
                      className="font-semibold m-0 text-sm font-primary"
                      style={{ color: textColor }}
                    >
                      {anonymousDonor
                        ? "Anonymous Donor"
                        : `${donation.customerFirstName} ${donation.customerLastName}`}
                    </p>
                    {showDonationDate && (
                      <p
                        className="text-xs m-0 font-primary"
                        style={{ color: textColor }}
                      >
                        {donation.customerAddress}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col text-right">
                    <p
                      className="font-semibold m-0 text-sm font-primary"
                      style={{ color: textColor }}
                    >
                      {currencySymbol}
                      {donation.total}
                    </p>
                    {showDonationDate && (
                      <p
                        className="text-xs m-0 font-primary"
                        style={{ color: textColor }}
                      >
                        {donation.createdOn}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        {showLoadButton && (
          <button
            className="py-1.5 px-4 rounded-md text-sm font-medium font-primary"
            style={{
              backgroundColor: buttonBgColor,
              color: textColor,
            }}
          >
            Load More
          </button>
        )}
      </div>
    </Card>
  );
}
