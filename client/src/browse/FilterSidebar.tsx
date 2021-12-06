import {
  Box,
  darken,
  Divider,
  lighten,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AlphaTypo } from "../components/AlphaTypo";
import { StackItem } from "../components/StackItem";
import { categories } from "./placeHolderCategories";
import CheckIcon from "@mui/icons-material/Check";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../header/SearchMenu";
import SearchIcon from "@mui/icons-material/Search";
import { GlobalContext } from "../App";

const FilterSidebar: React.FC<{
  setKeyword: Function;
  filters: string[];
  setFilters: Function;
}> = ({ setKeyword, filters, setFilters }) => {
  const { mode } = useContext(GlobalContext);

  const toggleFilter = (filter: string) => {
    filter = filter.toLowerCase();
    const index = filters.indexOf(filter);
    if (index !== -1) {
      setFilters(
        filters.filter((tag: any) => {
          if (tag !== filter) {
            return true;
          }
          return false;
        })
      );
      return;
    }
    setFilters([...filters, filter]);
  };

  return (
    <Box sx={{ pt: 2 }}>
      <Search mode={mode} sx={{ pl: 0, ml: "0 !important" }}>
        <SearchIconWrapper>
          <SearchIcon fontSize={"small"} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Keyword"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
      </Search>
      <Divider sx={{ my: 2 }} />
      <Stack spacing={1} sx={{ pt: 1 }}>
        {categories.map((tag: any, index: number) => (
          <StackItem key={index}>
            <AlphaTypo
              sx={{
                // border: "1px solid red",
                width: "100%",
                p: "0.6rem 0.3rem",
                borderRadius: 1,
                cursor: "pointer",
                textTransform: "capitalize",
                verticalAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                "& .MuiSvgIcon-root": {
                  display: "none",
                },
                "&:hover": {
                  color: "text.primary",
                },
                "&.active": {
                  color: "text.primary",
                  bgcolor: (theme) =>
                    lighten(theme.palette.background.default, 0.1),
                  "& .MuiSvgIcon-root": {
                    display: "block",
                  },
                },
              }}
              onClick={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.classList.toggle("active");
                toggleFilter(target.innerText);
              }}
            >
              {tag.name}
              <CheckIcon fontSize={"small"} sx={{ pb: "5px" }} />
            </AlphaTypo>
          </StackItem>
        ))}
      </Stack>
    </Box>
  );
};

export default FilterSidebar;
