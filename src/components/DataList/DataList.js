import styles from "./DataList.module.css";

export const DataList = ({children}) => (
    <dl>
        {children}
    </dl>
)

export const DataListItem = ({title, data}) => (
    <>
        <dt>{title}</dt>
        <dd>{data}</dd>
    </>
)