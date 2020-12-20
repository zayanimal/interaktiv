import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootStateTypes } from '@config/roots';
import { bem } from '@utils/formatters';
import './CompanyControl.scss';

const cn = bem('CompanyControl');

const mapStateToProps = (state: RootStateTypes) => ({

});

const mapDispatchToProps = {

};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const CompanyControl: React.FC<Props> = (props) => {
    // const {} = props;

    useEffect(() => {

    }, []);

    return (
        <div className={cn()}></div>
    );
};

const CompanyControlConnected = connect(mapStateToProps, mapDispatchToProps)(CompanyControl);

export { CompanyControlConnected as CompanyControl };
