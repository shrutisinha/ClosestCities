import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  TextField,
  Button
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { ICity } from '../../../types';

const useStyles = makeStyles((theme) =>
  createStyles({
    textBox: {
      paddingRight: theme.spacing(3)
    },
    button: {
      maxWidth: '220px',
      margin: theme.spacing(5, 1),
    },
    searchGrid: {
      width: '100%',
      padding: theme.spacing(4)
    }
  }),
);

interface ISearchBar {
  search?: string;
  handleSearch?: Function;
  handleSelect: Function;
  handleClick: Function;
  suggestions: ICity[];
  disabled: boolean;
}

const SearchBar: React.FC<ISearchBar> = ({
  search,
  handleSearch,
  handleSelect,
  handleClick,
  suggestions,
  disabled
}) => {
  const classes = useStyles();


  return (
    <Grid
      container
      spacing={4}
      className={classes.searchGrid}
      justify="space-between"
      alignItems="center"
    >
      <Grid item xs={10}>
        <Autocomplete
          id="combo-box-demo"
          options={suggestions}
          inputValue={search}
          getOptionLabel={(option) => option.name}
          onInputChange={(event, newInputValue) => {
            handleSearch && handleSearch(newInputValue);
          }}
          onChange={(event, newValue) => {
            handleSelect(newValue);
          }}
          renderInput={(params) =>
            <TextField
              {...params}
              id="searchBox"
              label="Enter City"
              variant="outlined"
              disabled={disabled}
              className={classes.textBox}
            />
          }
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="contained"
          onClick={() => handleClick()}
          disabled={disabled}
        >
          Get Closest Cities
      </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
