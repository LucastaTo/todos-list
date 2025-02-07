// React Imports
import React from "react";

// Style Imports
import {
  TabContainer,
  TabButton,
  TabContent,
  TabHeader,
  StyledLoading,
  StyledRankItem,
  StyledUserName,
  StyledScore,
  StyledNoRankingMessage,
} from "./style";

// Third-party Imports
import axios from "axios";

// Helper Imports
import apiUrl from "@/config";
import { formatTime } from "@/helpers";

// Shared Imports
import { Spinner } from "@todo/ui";

// Component Imports
import { useToast } from "@/components/custom-toastify/ToastProvider";

type RankingTab = "time" | "score";
type ListRanking = {
  authorName: string;
  score: number;
  time: number;
};

const RankingScreen: React.FC = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = React.useState<RankingTab>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [listRankings, setListRankings] = React.useState<ListRanking[]>([]);

  const handleTabChange = (tab: RankingTab) => {
    setActiveTab(tab);
  };

  React.useEffect(() => {
    const fetchRankings = async (type: RankingTab) => {
      setLoading(true);

      try {
        const { data } = await axios.get(`${apiUrl}/scores/top?type=${type}`);

        setListRankings(data.topScores || []);
      } catch (error) {
        showToast("Error fetching rankings", "error");
        console.error("Error fetching rankings", error);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };

    if (!!activeTab) fetchRankings(activeTab);
  }, [activeTab]);

  React.useEffect(() => {
    setActiveTab("time");
  }, []);

  return (
    <div>
      <TabHeader>
        <TabButton
          isActive={activeTab === "time"}
          onClick={() => handleTabChange("time")}
        >
          Time
        </TabButton>
        <TabButton
          isActive={activeTab === "score"}
          onClick={() => handleTabChange("score")}
        >
          Score
        </TabButton>
      </TabHeader>

      <TabContainer>
        {loading ? (
          <StyledLoading>
            <Spinner size="md" className="loading" />
          </StyledLoading>
        ) : (
          <TabContent>
            {listRankings.length > 0 ? (
              listRankings.map((rank, index) => (
                <StyledRankItem key={`${rank.authorName}-${index}`}>
                  <StyledUserName>{rank.authorName}</StyledUserName>
                  <StyledScore>
                    {activeTab === "time" ? formatTime(rank.time) : rank.score}
                  </StyledScore>
                </StyledRankItem>
              ))
            ) : (
              <StyledNoRankingMessage>
                No rankings available
              </StyledNoRankingMessage>
            )}
          </TabContent>
        )}
      </TabContainer>
    </div>
  );
};

export default RankingScreen;
