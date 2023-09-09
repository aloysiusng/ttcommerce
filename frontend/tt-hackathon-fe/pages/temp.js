<div className={styles.contentContainer}>
  {/* search bar */}
  <div className="searchBar">
    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
  </div>
  {/* modal open when product*/}
  <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
    <ModalProduct product={modalProduct} handleClose={() => setOpenModal(false)} />
  </Modal>
  {/* main content */}
  <h1 className={styles.sectionTitle}>Products Available</h1>
  <div className={styles.productCardContainer}>
    {allProducts.map((product) => (
      <div
        className={styles.productCardWrapper}
        key={product.product_id}
        onClick={() => {
          setOpenModal(true);
          setModalProduct(product);
        }}>
        <ProductCard product={product} />
      </div>
    ))}
  </div>
</div>;
