'use client';

import FullPageLoader from '@/components/loading/FullPageLoader';
import Header from '@/components/main/Header';
import Content from '@/components/other/Content';
import SearchBarSection from '@/components/search/SearchBarSection';
import SearchNoResults from '@/components/search/SearchNoResults';
import SearchResults from '@/components/search/SearchResults';
import { searchTMDB } from '@/utils/api';
import { useEffect, useState } from 'react';

export default function page() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    setIsLoading(true);

    searchTMDB(search, 'multi').then(results => {
      setResults(results);

      setTimeout(() => setIsLoading(false), 500);
    });
  };

  useEffect(() => {
    document.title = `${results.length} results for "${search}" | CineWorld`;
  }, [results]);

  return (
    <div>
      <Header />

      <Content>
        {/* Search Section */}
        <div className="space-y-7">
          <SearchBarSection
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
          />

          {isLoading ? (
            <FullPageLoader />
          ) : (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
              </div>

              {/* Search Results */}
              {results.length > 0 ? (
                <SearchResults results={results} />
              ) : (
                <SearchNoResults />
              )}
            </div>
          )}
        </div>
      </Content>
    </div>
  );
}
