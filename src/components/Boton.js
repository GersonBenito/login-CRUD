import React from 'react';
import { Button }from 'antd';
import 'antd/dist/antd.css';

const Boton = (props) => {
    const { primary, icon, title, action, danger, type } = props;
    return (
        <>
            <Button type={primary} icon={icon} danger={danger} htmlType={type} onClick={action}>{title}</Button>
        </>
    )
}

export default Boton
