import { utilService } from "../../../services/util.service.js"

const { useState, useEffect, useRef } = React

export function MailFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onDebounce = useRef(utilService.debounce(onSetFilter,500))

    useEffect(() => {
        onDebounce.current(filterByToEdit)
    }, [filterByToEdit])


    function handleChange({ target },) {

        let value = target.value


        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, from: value , subject:value , body:value}))
    }

    const { from } = filterByToEdit


    return (
        <section className="mail-filter">
            <form>
                <label htmlFor="from">Search</label>
                <input value={from} onChange={handleChange} type="text" id="from" />

            </form>

        </section>
    )
}