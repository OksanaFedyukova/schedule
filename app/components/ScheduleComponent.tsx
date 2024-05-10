'use client'

import { useEffect, useState } from 'react';
import tasks from "@/app/api/tasks";
import Session from "@/classes/Session";
import Task from '@/classes/Tasks';

const ScheduleComponent: React.FC = () => {
    const [afternoonSessionTasks, setAfternoonSessionTasks] = useState<Task[]>([]);
    const [eveningSessionTasks, setEveningSessionTasks] = useState<Task[]>([]);
    const [pendingSessionTasks, setPendingSessionTasks] = useState<Task[]>([]);

    useEffect(() => {
        let time: number = 240;

        const afternoonSession = new Session(time);
        const eveningSession = new Session(time);
        const pendingSession = new Session(time);

        tasks.forEach((task: Task) => {
            if (afternoonSession.canAddTask(task)) {
                afternoonSession.addTask(task);
                console.log(`Afternoon Session: Added ${task.title}`);
            } else if (eveningSession.canAddTask(task)) {
                eveningSession.addTask(task);
                console.log(`Evening Session: Added ${task.title}`);
            } else {
                pendingSession.addTask(task);
                console.log(`Could not add Task to Sessions. Status Pending: ${task.title}`);
            }
        });

        setAfternoonSessionTasks(afternoonSession.getTasks());
        setEveningSessionTasks(eveningSession.getTasks());
        setPendingSessionTasks(pendingSession.getTasks());
    }, []);

    return (
        <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-100 p-4 rounded-md">
                <h2 className="text-lg font-semibold mb-4">Afternoon Session</h2>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {afternoonSessionTasks.map(task => (
                            <tr key={task.id}>
                                <td className="px-4 py-2">{task.title}</td>
                                <td className="px-4 py-2">{task.duration} minutes</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-gray-100 p-4 rounded-md">
                <h2 className="text-lg font-semibold mb-4">Evening Session</h2>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eveningSessionTasks.map(task => (
                            <tr key={task.id}>
                                <td className="px-4 py-2">{task.title}</td>
                                <td className="px-4 py-2">{task.duration} minutes</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-gray-100 p-4 rounded-md">
                <h2 className="text-lg font-semibold mb-4">Pending Session</h2>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingSessionTasks.map(task => (
                            <tr key={task.id}>
                                <td className="px-4 py-2">{task.title}</td>
                                <td className="px-4 py-2">{task.duration} minutes</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
};

export default ScheduleComponent;
