'use client'
import React from 'react';
import {DayPilotScheduler} from "@daypilot/daypilot-lite-react";

const Scheduler = () => {
    const config = {
        startDate: "2024-12-01",
        days: 31,
        scale: "Day" as const,
        timeHeaders: [
            {groupBy: "Month" as const}, 
            {groupBy: "Day" as const, format: "d"}
        ],
        resources: [
            {name: "Resource 1", id: "R1"},
            {name: "Resource 2", id: "R2"},
            {name: "Resource 3", id: "R3"},
        ],
        events: [
            {
                id: 1,
                resource: "R1",
                start: "2024-12-05",
                end: "2024-12-08",
                text: "Project Alpha"
            },
            {
                id: 2,
                resource: "R2",
                start: "2024-12-02",
                end: "2024-12-04",
                text: "Meeting"
            },
            {
                id: 3,
                resource: "R2",
                start: "2024-12-10",
                end: "2024-12-14",
                text: "Development Sprint"
            },
            {
                id: 4,
                resource: "R3",
                start: "2024-12-06",
                end: "2024-12-08",
                text: "Training"
            }
        ],
        eventHeight: 40,
        cellWidth: 50,
        cellWidthSpec: "Fixed" as const,
        onBeforeEventRender: (args: any) => {
            args.data.backColor = "transparent";
            args.data.borderColor = "transparent";
            
            args.data.html = `
                <div style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 6px;
                    color: #ffffff;
                    font-weight: 500;
                    font-size: 13px;
                    padding: 6px 10px;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
                    transition: all 0.2s ease;
                    cursor: pointer;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                ">
                    ${args.data.text}
                </div>
            `;
        }
    };

    return (
        <div className="scheduler-container">
            <DayPilotScheduler {...config} />
        </div>
    );
}

export default Scheduler;