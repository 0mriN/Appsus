import { utilService } from "../../../services/util.service";


export function NotePreview({ note }) {
    const { info, type } = note

    function onChangeInfo() {
        console.log('Info changed');
    }

    return (
        <article className="note-preview">
            <DynamicCmp
                type={type}
                info={info}
                onChangeInfo={onChangeInfo}
            />
        </article>
    )
}

function NoteTxt({ info, onChangeInfo }) {
    return (
        <React.Fragment>
            <h2>{info.title && info.title}</h2>
            <p>{info.txt && info.txt}</p>
        </React.Fragment>
    )
}

function NoteImg({ info, onChangeInfo }) {
    return (
        <React.Fragment>
            <img src={info.url} alt="" />
        </React.Fragment>
    )
}

function NoteTodos({ info, onChangeInfo }) {
    // const id = utilService.makeId()
    // console.log(id);
    return (
        <React.Fragment>
            <h2>{info.title && info.title}</h2>
            <ul>
                {info.todos.map(todo =>
                    <li key={todo.todoId}>
                        {todo.txt}
                    </li>
                )}
            </ul>
        </React.Fragment>
    )
}

function DynamicCmp(props) {
    switch (props.type) {
        case 'NoteTxt':
            return <NoteTxt {...props} />
        case 'NoteImg':
            return <NoteImg {...props} />
        case 'NoteTodos':
            return <NoteTodos {...props} />
        default:
            null
    }
}