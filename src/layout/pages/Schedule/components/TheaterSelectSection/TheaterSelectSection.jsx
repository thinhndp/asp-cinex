import React, { useState, useEffect } from 'react';
// import { Container, Spinner } from 'react-bootstrap';

import CustomSelect from '../../../../../components/CustomSelect/CustomSelect';

// import * as clusterAPI from '../../../api/clusterAPI';
// import * as movieAPI from '../../../api/movieAPI';
// import * as screenTypeAPI from '../../../api/screenTypeAPI';
// import * as showtimeAPI from '../../../api/showtimeAPI';


import classes from './TheaterSelectSection.module.scss';

const TheaterSelectSection = (props) => {
  // Props:
  // clusters: array
  // onClusterChange: function(clusterId: string)

  // const [selectedClusterId, setSelectedClusterId] = useState(null);
  const [selectedCluster, setSelectedCluster] = useState({id: '', name: '', address: '', hotline: '',});
  const [clusterOptions, setClusterOptions] = useState([]);
  
  useEffect(() => {
    const newClusterOptions = props.clusters.map(cluster => {
      return {
        value: cluster.id,
        label: cluster.name,
      }
    });
    setClusterOptions(newClusterOptions);
  }, [props.clusters]);

  useEffect(() => {
    if (clusterOptions.length > 0) {
      // setSelectedClusterId(clusterOptions[0].value);
      const newSelectedCluster = props.clusters.find(cluster => cluster.id === clusterOptions[0].value);
      setSelectedCluster(newSelectedCluster);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clusterOptions]);

  return (
    <div style={{position: 'relative', color: '#fff'}}>
      {/* <div className={classes['big-text']}>
        Theater
      </div>
      <div className={classes['fading-line']}></div> */}
      {/* <div className="row">
        <div className="col-5">
          <div className={classes['label-text']} style={{marginBottom: 10}}>Choose a Theater:</div>
          <CustomSelect
            placeholder="Select Theater"
            selectWidth="100%"
            options={clusterOptions}
            value={selectedCluster.id}
            onChange={(newSelected) => {
              props.onClusterChange(newSelected.value);
              const newSelectedCluster = props.clusters.find(cluster => cluster.id === newSelected.value);
              setSelectedCluster(newSelectedCluster);
            }}
          />
          <div className={classes['theater-info-card']}>
            <div style={{fontSize: 30, textTransform: 'uppercase', fontWeight: 'bold'}}>{selectedCluster.name}</div>
            <div style={{fontSize: 22}}>Address: {selectedCluster.address}</div>
            <div style={{fontSize: 22}}>Hotline: {selectedCluster.hotline}</div>
          </div>
        </div>
      </div> */}
      <div className={classes['label-text']} style={{marginBottom: 10}}>Choose a Theater:</div>
      <CustomSelect
        placeholder="Select Theater"
        selectWidth="100%"
        options={clusterOptions}
        value={selectedCluster.id}
        onChange={(newSelected) => {
          props.onClusterChange(newSelected.value);
          const newSelectedCluster = props.clusters.find(cluster => cluster.id === newSelected.value);
          setSelectedCluster(newSelectedCluster);
        }}
      />
      <div className={classes['theater-info-card']}>
        <div style={{fontSize: 30, textTransform: 'uppercase', fontWeight: 'bold'}}>{selectedCluster.name}</div>
        <div style={{fontSize: 22}}>Address: {selectedCluster.address}</div>
        {/* <div style={{fontSize: 22}}>Hotline: {selectedCluster.hotline}</div> */}
      </div>
    </div>
  );
}

export default TheaterSelectSection;