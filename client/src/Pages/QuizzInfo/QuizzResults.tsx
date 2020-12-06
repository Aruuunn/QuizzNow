import { Typography } from "@material-ui/core";
import React, { ReactElement, useState } from "react";

import axios from "../../common/axios";
import { ACCESS_TOKEN } from "../../common/constants";

interface Props {
  quizzId: string;
}

function QuizzResults(props: Props): ReactElement {
  const { quizzId } = props;

  const [loading, setLoading] = useState(true);

  const [results, setResults] = useState<
    | null
    | {
        optionChoosed: string;
        question: {
          questionTitle: string;
          correctAnswer: string;
          multipleChoices: string[];
        };
      }[]
  >(null);

  const fetchResults = async () => {
    if (results) return;
    try {
      const res = axios.get(`/quizz/${quizzId}/results`, {
        headers: {
          Auhtorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      });

      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  if (!results) {
    fetchResults();
  }
  return <div>
    <Typography variant="h4">Results</Typography>
  </div>;
}

export default QuizzResults;
