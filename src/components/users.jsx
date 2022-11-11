import { useState } from "react";
import api from "../api";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const renderPhrase = (number) => {
        let phrase = "";

        const lastNumber = Number(
            number.toString()[number.toString().length - 1]
        );

        if (number === 0) {
            phrase = "Никто с тобой не тусанет";
        } else if (
            (lastNumber >= 2 && lastNumber <= 4 && number > 21) ||
            (number >= 2 && number <= 4)
        ) {
            phrase = `${number} человека тусанут с тобой сегодня`;
        } else {
            phrase = `${number} человек тусанет с тобой сегодня`;
        }

        return phrase;
    };

    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((user) => user !== userId));
    };

    const getBadgeTitle = () => {
        let classes = "badge ";
        classes += users.length === 0 ? "bg-danger" : "bg-primary";

        return classes;
    };

    const titleArray = [
        "Имя",
        "Качества",
        "Профессия",
        "Встретился раз",
        "Оценка",
        "",
    ];

    const countOfUsers = (
        <span className={getBadgeTitle()}>{renderPhrase(users.length)}</span>
    );

    if (users.length === 0) {
        return countOfUsers;
    }

    return (
        <>
            {countOfUsers}
            <table className='table'>
                <thead>
                    <tr>
                        {titleArray.map((title) => (
                            <th scope='col' key={title}>
                                {title}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            {<td scope='row'>{user.name}</td>}

                            {
                                <td>
                                    {user.qualities.map((quality) => (
                                        <td
                                            className={`badge bg-${quality.color}`}>
                                            {quality.name}
                                        </td>
                                    ))}
                                </td>
                            }

                            {<td>{user.profession.name}</td>}

                            {<td>{user.completedMeetings}</td>}

                            {<td>{user.rate}</td>}

                            {
                                <td>
                                    {
                                        <button
                                            key={user}
                                            className='btn btn-danger'
                                            onClick={() => handleDelete(user)}>
                                            delete
                                        </button>
                                    }
                                </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Users;
